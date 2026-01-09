import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ProductCategory enum values
const PRODUCT_CATEGORIES = [
  'JOURNALS',
  'WORKBOOKS',
  'SUPPLEMENTS',
  'COMFORT_ITEMS',
  'BOOKS',
  'BUNDLES',
] as const;

type ProductCategoryType = typeof PRODUCT_CATEGORIES[number];

// GET /api/store/products - Fetch products with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const categoryParam = searchParams.get('category')?.toUpperCase();
    const category = PRODUCT_CATEGORIES.includes(categoryParam as ProductCategoryType)
      ? categoryParam as ProductCategoryType
      : null;
    const sort = searchParams.get('sort') || 'newest';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      isPublished: true,
    };

    // Category filter
    if (category) {
      where.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        (where.price as Record<string, number>).gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        (where.price as Record<string, number>).lte = parseFloat(maxPrice);
      }
    }

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy clause
    let orderBy: Record<string, string> = {};
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      case 'name-asc':
        orderBy = { name: 'asc' };
        break;
      case 'name-desc':
        orderBy = { name: 'desc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
        break;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch products and total count in parallel
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          price: true,
          compareAtPrice: true,
          category: true,
          images: true,
          inventory: true,
          isDigital: true,
          isPublished: true,
          createdAt: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Transform products for frontend consumption
    type ProductResult = typeof products[number];
    const transformedProducts = products.map((product: ProductResult) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      category: product.category,
      image: product.images[0] || '/images/placeholder-product.svg',
      images: product.images,
      inStock: product.inventory > 0 || product.isDigital,
      inventory: product.inventory,
      isDigital: product.isDigital,
      createdAt: product.createdAt.toISOString(),
    }));

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// GET /api/store/products/[slug] would be a separate route for single product

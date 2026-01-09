import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { syncUserToDatabase, UserType } from '@/lib/auth/user-sync';

interface SyncRequestBody {
  userType: UserType;
}

export async function POST(request: NextRequest) {
  try {
    // Verify the user is authenticated
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body: SyncRequestBody = await request.json();

    // Validate userType
    if (!body.userType || !['practitioner', 'patient'].includes(body.userType)) {
      return NextResponse.json(
        { error: 'Invalid userType. Must be "practitioner" or "patient".' },
        { status: 400 }
      );
    }

    // Sync the user to our database
    const result = await syncUserToDatabase(body.userType);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to sync user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    console.error('Error in user sync API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

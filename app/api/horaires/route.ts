import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ success: true, data: [] });
    }

    const hoursSnapshot = await db.collection('opening_hours').orderBy('dayOfWeek').get();

    const hours = hoursSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, data: hours });
  } catch (error) {
    console.error('GET horaires error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des horaires' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    const data = await request.json();

    const docRef = await db.collection('opening_hours').add({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Horaires créés avec succès',
    });
  } catch (error) {
    console.error('POST horaires error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création des horaires' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { id, ...data } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID manquant' },
        { status: 400 }
      );
    }

    await db.collection('opening_hours').doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Horaires mis à jour avec succès',
    });
  } catch (error) {
    console.error('PUT horaires error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour des horaires' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID manquant' },
        { status: 400 }
      );
    }

    await db.collection('opening_hours').doc(id).delete();

    return NextResponse.json({
      success: true,
      message: 'Horaires supprimés avec succès',
    });
  } catch (error) {
    console.error('DELETE horaires error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression des horaires' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/api/firebase/admin';

export const runtime = 'nodejs';

export async function GET() {
  try {
    if (!adminDb) {
      return NextResponse.json({ success: true, data: [] });
    }

    const menuSnapshot = await adminDb.collection('menu_items').orderBy('order').get();

    const menuItems = menuSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, data: menuItems });
  } catch (error) {
    console.error('GET menu error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du menu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    const data = await request.json();

    const docRef = await adminDb.collection('menu_items').add({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Élément de menu créé avec succès',
    });
  } catch (error) {
    console.error('POST menu error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de l\'élément de menu' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!adminDb) {
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

    await adminDb.collection('menu_items').doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Élément de menu mis à jour avec succès',
    });
  } catch (error) {
    console.error('PUT menu error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour de l\'élément de menu' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!adminDb) {
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

    await adminDb.collection('menu_items').doc(id).delete();

    return NextResponse.json({
      success: true,
      message: 'Élément de menu supprimé avec succès',
    });
  } catch (error) {
    console.error('DELETE menu error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression de l\'élément de menu' },
      { status: 500 }
    );
  }
}

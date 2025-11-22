import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { adminDb } from '@/lib/api/firebase/admin';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    const contactData = {
      name,
      email,
      phone: phone || null,
      subject,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let docRef;
    if (adminDb) {
      docRef = await adminDb.collection('contact_messages').add(contactData);
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminHtmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 100%;">
          <tr>
            <td style="background: linear-gradient(135deg, #d3cbc2 0%, #b8af9f 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">La Cité Fleurie</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">Nouveau message de contact</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 22px;">Détails du message</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #d3cbc2;">
                    <strong style="color: #666666; font-size: 12px; text-transform: uppercase;">Nom</strong>
                    <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px;">${name}</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #d3cbc2;">
                    <strong style="color: #666666; font-size: 12px; text-transform: uppercase;">Email</strong>
                    <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px;">
                      <a href="mailto:${email}" style="color: #d3cbc2; text-decoration: none;">${email}</a>
                    </p>
                  </td>
                </tr>
                ${phone ? `
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #d3cbc2;">
                    <strong style="color: #666666; font-size: 12px; text-transform: uppercase;">Téléphone</strong>
                    <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px;">
                      <a href="tel:${phone}" style="color: #d3cbc2; text-decoration: none;">${phone}</a>
                    </p>
                  </td>
                </tr>
                ` : ''}
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #d3cbc2;">
                    <strong style="color: #666666; font-size: 12px; text-transform: uppercase;">Sujet</strong>
                    <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px;">${subject}</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #d3cbc2;">
                    <strong style="color: #666666; font-size: 12px; text-transform: uppercase;">Message</strong>
                    <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px;">© 2024 La Cité Fleurie - Chemin de l'Echo 3, 1213 Onex, Suisse</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const clientHtmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de votre message</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 100%;">
          <tr>
            <td style="background: linear-gradient(135deg, #d3cbc2 0%, #b8af9f 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 1px;">La Cité Fleurie</h1>
              <p style="color: #ffffff; margin: 15px 0 0 0; font-size: 16px; font-style: italic;">Restaurant • Lounge Bar • Pizzeria</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px; text-align: center;">Message bien reçu !</h2>

              <p style="color: #666666; line-height: 1.8; font-size: 16px; margin: 0 0 20px 0;">
                Bonjour <strong style="color: #d3cbc2;">${name}</strong>,
              </p>

              <p style="color: #666666; line-height: 1.8; font-size: 16px; margin: 0 0 20px 0;">
                Nous avons bien reçu votre message et nous vous en remercions. Notre équipe le traitera dans les plus brefs délais.
              </p>

              <p style="color: #666666; line-height: 1.8; font-size: 16px; margin: 0 0 30px 0;">
                Nous reviendrons vers vous très prochainement.
              </p>

              <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; border-left: 4px solid #d3cbc2; margin: 30px 0;">
                <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">Nos coordonnées</h3>
                <p style="margin: 8px 0; color: #666666; font-size: 14px;">
                  <strong>Téléphone :</strong> <a href="tel:+41227930350" style="color: #d3cbc2; text-decoration: none;">+41 22 793 03 50</a>
                </p>
                <p style="margin: 8px 0; color: #666666; font-size: 14px;">
                  <strong>Adresse :</strong> Chemin de l'Echo 3, 1213 Onex, Suisse
                </p>
                <p style="margin: 8px 0; color: #666666; font-size: 14px;">
                  <strong>Horaires :</strong> 7j/7 de 07h30 à 00h00
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <p style="margin: 0 0 15px 0; color: #999999; font-size: 14px;">Suivez-nous sur les réseaux sociaux</p>
                <a href="https://www.facebook.com/p/La-Cit%C3%A9-Fleurie-100063631886817/" style="display: inline-block; background-color: #d3cbc2; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">Voir notre page Facebook</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #333333; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: bold;">À bientôt à La Cité Fleurie !</p>
              <p style="margin: 0; color: #999999; font-size: 12px;">© 2024 La Cité Fleurie - Tous droits réservés</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL,
        subject: `[Contact] ${subject}`,
        html: adminHtmlContent,
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Confirmation de votre message - La Cité Fleurie',
        html: clientHtmlContent,
      });

      if (adminDb && docRef) {
        await adminDb.collection('contact_messages').doc(docRef.id).update({
          status: 'sent',
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Message enregistré avec succès',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Une erreur est survenue',
      },
      { status: 500 }
    );
  }
}

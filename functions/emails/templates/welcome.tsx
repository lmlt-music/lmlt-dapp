import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Link,
} from '@react-email/components';
import * as React from 'react';

export const WelcomeEmail = ({ name }: { name?: string }) => (
    <Html>
        <Head />
        <Preview>Welcome to Limelight - Revolutionizing Music Discovery</Preview>
        <Body
            style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                lineHeight: '24px',
                backgroundColor: '#1e0739', // Limelight-themed background color
                color: '#ffffff',
                padding: '20px',
            }}
        >
            <Container style={{ margin: 'auto', maxWidth: '600px', backgroundColor: '#2a064d', borderRadius: '10px', padding: '20px' }}>
                {/* Header */}
                <Img
                    src="https://limelight-music-logo-url.png" // Replace with Limelight logo URL
                    alt="Limelight Logo"
                    width="150"
                    height="50"
                    style={{ display: 'block', margin: '0 auto 20px' }}
                />

                {/* Welcome Section */}
                <Section style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff4ddb' }}>
                        Welcome to Limelight, {name || 'there'}!
                    </Text>
                    <Text style={{ fontSize: '16px', color: '#ffffff' }}>
                        Revolutionizing music discovery through algorithmic artist discovery. We're thrilled to have you join us!
                    </Text>
                </Section>

                {/* Instructions */}
                <Section style={{ padding: '20px 0', textAlign: 'center' }}>
                    <Text style={{ fontSize: '16px', color: '#ffffff' }}>
                        Here's how you can get started:
                    </Text>
                    <ul style={{ listStyleType: 'none', padding: 0, color: '#ffffff', fontSize: '16px' }}>
                        <li>🎵 Discover new artists and tracks</li>
                        <li>🌟 Vote for your favorite songs</li>
                        <li>📈 Track your music journey with AI-powered insights</li>
                        <li>💰 Earn rewards for engaging with the platform</li>
                    </ul>
                </Section>

                {/* CTA */}
                <Section style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link
                        href="https://limelight-music-platform.com" // Replace with actual platform URL
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            backgroundColor: '#ff4ddb',
                            borderRadius: '20px',
                            textDecoration: 'none',
                        }}
                    >
                        Explore Limelight
                    </Link>
                </Section>

                {/* Divider */}
                <Hr style={{ borderColor: '#4a4a4a', margin: '20px 0' }} />

                {/* Footer */}
                <Section style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: '14px', color: '#ffffff' }}>
                        Have questions? Visit our{' '}
                        <Link href="https://support.limelight-music.com" style={{ color: '#ff4ddb' }}>
                            Support Center
                        </Link>{' '}
                        or reach out to us directly.
                    </Text>
                    <Text style={{ fontSize: '12px', color: '#8898aa', marginTop: '10px' }}>
                        Limelight Music, Inc. <br />
                        1234 Limelight Ave, Music City, 56789
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;
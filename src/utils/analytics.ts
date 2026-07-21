/**
 * Safely triggers Google Ads Conversion tracking.
 */
export function trackGoogleConversion() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18303591488/Qch9COKT1MscEMDI6pdE',
        'transaction_id': ''
      });
      console.log('Google conversion tracked successfully');
    } catch (e) {
      console.error('Error tracking Google conversion:', e);
    }
  }
}

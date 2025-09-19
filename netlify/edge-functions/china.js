export default async (request, context) => {
  const country = context.geo.country?.code;

  if (country === 'CN') {
    const message = "Scratch is blocked in China by the Great Firewall, and as a precaution we are not allowing access from China. If you are not in China, check to see if you have a VPN enabled.";
    
    return new Response(message, {
      headers: { 'content-type': 'text/plain' },
      status: 200,
    });
  }

  return;
};
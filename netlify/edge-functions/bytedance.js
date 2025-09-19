const BLOCKED_USER_AGENTS = ['Bytespider', 'Bytedance'];

export default async (request) => {
  const userAgent = request.headers.get('user-agent');
  
  if (userAgent) {
    const lowerCaseUserAgent = userAgent.toLowerCase();
  
    if (BLOCKED_USER_AGENTS.some(agent => lowerCaseUserAgent.includes(agent.toLowerCase()))) {
      console.log(`Disguising access from user agent: ${userAgent} with a 404.`);
      
      // Return a 404 Not Found response
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  // If the user agent is not blocked, proceed with the request
  return;
};

export const config = {
  // The path to apply this function to.
  path: '/*',
};
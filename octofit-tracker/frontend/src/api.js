export const getApiUrl = (endpointName) => {
  const hostname = window.location.hostname || '';
  const host = window.location.host || '';

  if (hostname.endsWith('.app.github.dev')) {
    const backendHost = host.replace(/-3000(\.app\.github\.dev)$/, '-8000$1');
    return `https://${backendHost}/api/${endpointName}/`;
  }

  const rawCodespaceName = process.env.REACT_APP_CODESPACE_NAME || '';
  const codespaceName = rawCodespaceName.trim().replace(/\s+/g, '-');

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${endpointName}/`;
  }

  return `http://localhost:8000/api/${endpointName}/`;
};

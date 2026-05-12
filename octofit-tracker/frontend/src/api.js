export const getApiUrl = (endpointName) => {
  const host = window.location.host || '';
  const path = `/api/${endpointName}/`;
  const rawCodespaceName = process.env.REACT_APP_CODESPACE_NAME || '';
  const codespaceName = rawCodespaceName.trim().replace(/\s+/g, '-');

  // GitHub Codespaces may expose the app either as `*.app.github.dev` or `*.github.dev`.
  if (host.includes('.app.github.dev') || host.includes('.github.dev')) {
    let backendHost = host.replace(/-3000(\.(?:app\.)?github\.dev)$/, '-8000$1');
    if (backendHost === host && codespaceName) {
      backendHost = `${codespaceName}-8000.app.github.dev`;
    }
    return `https://${backendHost}${path}`;
  }

  if (host.startsWith('localhost:3000') || host.startsWith('127.0.0.1:3000')) {
    return `http://localhost:8000${path}`;
  }

  // If frontend is served from the same host as backend, use a relative API path.
  return path;
};

interface CustomNavigatorUAData {
  brands?: Array<{ brand: string; version: string }>;
}

const userAgent = window.navigator.userAgent;

export function detectUserOS() {
  let os = 'Unknown OS';

  if (userAgent.indexOf('Win') != -1) os = 'Windows';
  if (userAgent.indexOf('Mac') != -1) os = 'MacOS';
  if (userAgent.indexOf('X11') != -1) os = 'UNIX';
  if (userAgent.indexOf('Linux') != -1) os = 'Linux';
  //   const userAgent = window.navigator.userAgent,
  //     platform = window.navigator.platform,
  //     macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
  //     windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
  //     iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  //   let os = null;

  //   if (macosPlatforms.indexOf(platform) !== -1) {
  //     os = 'Mac OS';
  //   } else if (iosPlatforms.indexOf(platform) !== -1 || /mac/.test(userAgent)) {
  //     os = 'iOS';
  //   } else if (windowsPlatforms.indexOf(platform) !== -1) {
  //     os = 'Windows';
  //   } else if (/Android/.test(userAgent)) {
  //     os = 'Android';
  //   } else if (!os && /Linux/.test(platform)) {
  //     os = 'Linux';
  //   }

  return os;
}

export function detectUserDeviceVersion() {
  const match = /(iPhone|iPad|iPod|Android|Win|Mac|X11|Linux).*?([\d_]+)/.exec(userAgent);
  const version = match ? match[2].replace(/_/g, '.') : 'Unknown';

  return version;
}

export function detectUserBrowserDetails(): { browserName: string; browserVersion: string } {
  if ('userAgentData' in navigator) {
    const userAgentData = navigator.userAgentData as CustomNavigatorUAData;
    if (userAgentData.brands) {
      const browserName = userAgentData?.brands[0]?.brand || 'Unknown';
      const browserVersion = userAgentData?.brands[0]?.version || 'Unknown';
      return {
        browserName,
        browserVersion,
      };
    }
    return {
      browserName: 'Unknown',
      browserVersion: 'Unknown',
    };
  } else {
    return {
      browserName: 'Unknown',
      browserVersion: 'Unknown',
    };
  }
}

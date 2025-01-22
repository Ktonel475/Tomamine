const path = require('path');
const { VitePlugin } = require('@electron-forge/plugin-vite');

module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32', 'darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "src/assets/app-icon.icns"
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        build: [
          {
            entry: 'src/main.js',  // Ensure this path is correct
            config: 'vite.main.config.mjs',  // Vite config for main process
          },
          {
            entry: 'src/preload.js',  // Ensure this file exists
            config: 'vite.preload.config.mjs',  // Vite config for preload script
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs',  // Vite config for renderer process
          },
        ],
      },
    },
  ],
};

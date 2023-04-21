import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			workbox: {
				globPatterns: ['**/*'],
			},
			includeAssets: ['**/*'],
			manifest: {
				theme_color: '#43677f',
				background_color: '#43677f',
				display: 'standalone',
				scope: '/',
				start_url: '/index.html',
				short_name: 'Passes',
				description:
					'Simple, user-friendly interface for generating boarding passes for passengers',
				name: 'Boarding Pass',
				icons: [
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						src: '/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png',
					},
					{
						src: '/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/maskable_icon.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
})

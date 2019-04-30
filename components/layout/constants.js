
export const SIDER_LINKS = [
	{
		icon: 'dashboard',
		key: 'home',
		name: 'Home',
		path: '/admin',
	},
	{
		icon: 'appstore',
		key: 'resources',
		name: 'Learning Resources',
		path: '/admin/resources',
	},
	{
		icon: 'edit',
		key: 'practice',
		name: 'Practice',
		path: '/admin/practice',
	},
	{
		icon: 'thunderbolt',
		key: 'challenge',
		name: 'Challenge Friends',
		path: '/admin/challenge',
	},
	{
		icon: 'user',
		key: 'profile',
		name: 'Profile',
		path: '/admin/profile',
	}
];

export const LOGO_TEXT = 'Leer';

export const greetUser = user => `Hello ${user || ''}`;

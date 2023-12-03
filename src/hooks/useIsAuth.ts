import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useIsAuth = () => {
	const { parsedToken } = useSelector(({ session }) => session);
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const currentTime = new Date().getTime();
		if (!parsedToken || parsedToken.exp < currentTime / 1000) {
			router.push('/login?navigatedFrom=' + pathname);
		}
	}, [parsedToken, pathname, router]);
};

export default useIsAuth;

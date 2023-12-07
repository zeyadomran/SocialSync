import isValidToken from '@/components/helpers/isValidToken';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useIsAuth = (skipLogin?: boolean) => {
	const { parsedToken } = useSelector(({ session }) => session);
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!isValidToken(parsedToken) && !skipLogin) {
			router.push(
				'/login?navigatedFrom=' + pathname + '?' + searchParams.toString()
			);
		} else if (isValidToken(parsedToken) && !pathname.startsWith('/app')) {
			router.push(searchParams.get('navigatedFrom') ?? '/app/home');
		}
	}, [parsedToken, pathname, router, searchParams, skipLogin]);
};

export default useIsAuth;

'use client';

import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setAuth, logout} from '@/features/auth/authSlice';
import { setCart } from '@/features/cart/cartSlice';

export default function ReduxInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const AccessToken = localStorage.getItem('AccessToken');
    const userId = localStorage.getItem('userId');
    const expiresAtStr = localStorage.getItem('expiresAt');
    const now = Date.now();
    const expiresAt = expiresAtStr ? Number(expiresAtStr) : undefined;

    // If expired, enforce logout immediately
    if (AccessToken && expiresAt && expiresAt <= now) {
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('expiresAt');
      dispatch(logout());
      return;
    }

    if (AccessToken && userId) {
      dispatch(setAuth({ AccessToken, userId, expiresAt }));

      // Auto-logout when expiration time is reached
      if (expiresAt) {
        const msLeft = Math.max(0, expiresAt - now);
        const timeout = setTimeout(() => {
          try {
            // Attempt backend logout (fire-and-forget)
            fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${AccessToken}` } });
          } catch {}
          localStorage.removeItem('AccessToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('expiresAt');
          dispatch(logout());
        }, msLeft);
        return () => clearTimeout(timeout);
      }

      // Initialize cart count from API (with refresh-on-401)
      const initCart = async () => {
        try {
          let token = AccessToken;
          let res = await fetch('/api/cart/get-cart', {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
          });
          if (res.status === 401) {
            const r = await fetch('/api/auth/refresh', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
            if (r.ok) {
              const d = await r.json();
              const newToken = d.AccessToken || d.accessToken || d.token;
              if (newToken) {
                const newExpires = Date.now() + 10 * 60 * 1000;
                localStorage.setItem('AccessToken', newToken);
                localStorage.setItem('expiresAt', String(newExpires));
                dispatch(setAuth({ AccessToken: newToken, userId, expiresAt: newExpires }));
                token = newToken;
                res = await fetch('/api/cart/get-cart', { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
              }
            }
          }
          const data = await res.json();
          if (res.ok) {
            const items = Array.isArray(data?.data?.items) ? data.data.items : (Array.isArray(data?.items) ? data.items : []);
            const count = Array.isArray(items)
              ? items.reduce((sum: number, it: any) => sum + (it.quantity || 0), 0)
              : 0;
            const normalized = items.map((it: any) => ({
              id: it.productId || it._id || it.id,
              name: it?.product?.name || it?.name,
              image: it?.product?.image || it?.image,
              price: it?.product?.price || it?.price,
              quantity: it.quantity || 0,
            }));
            dispatch(setCart({ items: normalized, count }));
          }
        } catch (_) {
          // ignore init cart errors
        }
      };
      initCart();
    }
  }, [dispatch]);

  return null;
}
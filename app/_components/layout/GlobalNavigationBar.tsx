'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Box, Divider, Typography } from '@mui/material';
import { PRODUCT_MENU } from '@/app/_modules/constants';
import { productStore, IProductState } from '@/app/_modules/store/productStore';

/**
 * 레이아웃 > 상단 네비게이션 바 컴포넌트
 */
function GlobalNavigationBar() {
  const router = useRouter();
  const { selectProductType, setSelectProductType } =
    productStore<IProductState>((state) => state);

  function handleTypeClick(type: { name: string; url: string }) {
    setSelectProductType(type.name);
    router.push(`/${type.url}`);
  }

  return (
    <>
      <Divider className="border-gray-300 mt-10 mb-2" />

      <Box className="w-full min-h-10 flex flex-wrap items-center justify-center ease-in-out transition-all">
        {PRODUCT_MENU.TYPE.map((type) => (
          <Typography
            onClick={() => handleTypeClick(type)}
            className={clsx(
              'my-auto mx-4 text-4',
              'textHover',
              selectProductType === type.name && 'selectFilter',
            )}
            key={type.name}
          >
            {type.name}
          </Typography>
        ))}
      </Box>

      <Divider className="border-gray-300 mt-2 mb-4" />
    </>
  );
}

export default GlobalNavigationBar;

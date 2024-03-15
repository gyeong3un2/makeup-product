'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Grid } from '@mui/material';
import { GetProductListResponse } from '@/app/modules/types/index';
import { defaultImage, skeletonCounts } from '@/app/modules/constants';
import { IProductState, productStore } from '@/app/modules/store/productStore';
import { useGetProductList } from '../modules/hooks/useGetProductList';
import { ProductColor, ProductInfo, SkeletonUI } from '.';

/**
 * 메인 페이지 > 상품 리스트 컴포넌트
 */
function DisplayProducts() {
  const router = useRouter();
  const {
    selectProductCategory,
    selectProductTag,
    selectProductType,
    setSelectProductId,
  } = productStore<IProductState>((state) => state);

  const handleClick = useCallback(
    (value: GetProductListResponse) => {
      setSelectProductId(value.id);
      router.push(`/product/${value.id}`);
    },
    [router],
  );

  const { fetchStatus, data: productList } = useGetProductList({
    selectProductType,
    selectProductCategory,
    selectProductTag,
  });

  return (
    <Grid container rowSpacing={2} gridAutoRows={1}>
      {productList && fetchStatus === 'idle'
        ? productList.map((product: GetProductListResponse) => (
            <Grid item xs={12} sm={6} md={3} key={product?.id}>
              <Card
                onClick={() => handleClick(product)}
                className="h-full shadow-none max-screen-w-64 hover:cursor-pointer hover:shadow-2xl transition ease-in-out hover:-translate-y-1 duration-300"
              >
                <Image
                  className="w-36 m-auto my-3"
                  draggable={false}
                  src={
                    product?.api_featured_image
                      ? `http:${product?.api_featured_image}`
                      : defaultImage
                  }
                  alt={product?.name}
                  width={24}
                  height={24}
                />

                <CardContent>
                  <ProductInfo product={product} />

                  <ProductColor productColors={product?.product_colors} />
                </CardContent>
              </Card>
            </Grid>
          ))
        : skeletonCounts.map((count) => (
            <Grid item xs={12} sm={6} md={3} key={count}>
              <SkeletonUI />
            </Grid>
          ))}
    </Grid>
  );
}

export default DisplayProducts;

import type { GetProductListResponse } from '@/app/_modules/types';
import { gruppo } from '@/app/_modules/constants';
import { Box } from '@mui/material';
import clsx from 'clsx';

interface IProductContentsProps {
  productInfo: GetProductListResponse | undefined;
}

/**
 * 상품 상세 페이지 > 상품 상세 정보 컴포넌트
 */
function ProductContents({ productInfo }: IProductContentsProps) {
  return (
    <Box>
      <div className={clsx(gruppo.className, 'm-2')}>
        <span className="font-bold text-lg">Description:</span> <br />{' '}
        {productInfo?.description}
      </div>

      <div className={clsx(gruppo.className, 'm-2 mt-5')}>
        <span className="font-bold text-lg">Categorys:</span> <br />{' '}
        <li className="mx-2">{productInfo?.category}</li>
      </div>
      <div className={clsx(gruppo.className, 'm-2 mt-5')}>
        <span className="font-bold text-lg">Tags:</span> <br />{' '}
        {productInfo?.tag_list &&
          productInfo?.tag_list.map((tag: string) => (
            <li key={tag} className="mx-2">
              {tag}
            </li>
          ))}
      </div>
    </Box>
  );
}

export default ProductContents;

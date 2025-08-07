import { transformTypes } from 'style-dictionary/enums';
import type { Transform, TransformedToken } from 'style-dictionary/types';

export const attributePreview: Transform = {
  type: transformTypes.attribute,
  name: 'attribute/preview',
  transform: (token: TransformedToken, _config) => {
    const attributes = token.attributes || {};
    console.log(token);
    return attributes;
  },
};

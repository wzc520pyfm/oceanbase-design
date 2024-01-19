import React, { useContext } from 'react';
import { Typography as AntTypography } from 'antd';
import classNames from 'classnames';
import type { ParagraphProps as AntParagraphProps } from 'antd/es/typography/Paragraph';
import ConfigProvider from '../config-provider';
import useStyle from './style';

const { Paragraph: AntParagraph } = AntTypography;

export * from 'antd/es/typography/Paragraph';

export interface ParagraphProps extends AntParagraphProps {}

const Paragraph = React.forwardRef<HTMLDivElement, ParagraphProps>(
  ({ prefixCls: customizePrefixCls, children, className, ...restProps }, ref) => {
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixCls = getPrefixCls('typography', customizePrefixCls);
    const { wrapSSR } = useStyle(prefixCls);
    const cls = classNames(
      {
        [`${prefixCls}-inhert`]: !restProps.type,
      },
      className
    );

    return wrapSSR(
      <AntParagraph ref={ref} prefixCls={customizePrefixCls} className={cls} {...restProps}>
        {children}
      </AntParagraph>
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  Paragraph.displayName = AntParagraph.displayName;
}

export default Paragraph;

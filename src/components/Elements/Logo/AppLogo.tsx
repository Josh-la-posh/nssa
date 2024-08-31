import clsx from 'clsx';
import { Fragment, SVGProps } from 'react';
import { Link } from 'react-router-dom';

import LogoBlackText from '@/assets/icons/logo-black-text.svg';
import LogoPrimaryText from '@/assets/icons/logo-primary-text.svg';
import LogoPrimary from '@/assets/icons/logo-primary.svg';
import LogoWhiteText from '@/assets/icons/logo-white-text.svg';
import LogoWhite from '@/assets/icons/logo-white.svg';

export type LogoProps = SVGProps<SVGSVGElement> & {
  variant?: 'primary' | 'primary-text' | 'white' | 'white-text' | 'black-text';
  to?: string;
  linkClassName?: string;
};

export const Logo = (props: LogoProps) => {
  const { variant = 'primary', className, to, linkClassName } = props;

  return (
    <Fragment>
      {
        {
          primary: to ? (
            <Link to={to} className={linkClassName}>
              <img
                aria-label="Oponeko Logo"
                className={clsx('', className)}
                src={LogoPrimary.toString()}
              />
            </Link>
          ) : (
            <img
              aria-label="Oponeko Logo"
              className={clsx('', className)}
              src={LogoPrimary.toString()}
            />
          ),
          'primary-text': to ? (
            <Link to={to} className={linkClassName}>
              <img
                aria-label="Oponeko Logo"
                className={clsx('', className)}
                src={LogoPrimaryText.toString()}
              />
            </Link>
          ) : (
            <img
              aria-label="Oponeko Logo"
              className={clsx('', className)}
              src={LogoPrimaryText.toString()}
            />
          ),
          white: to ? (
            <Link to={to} className={linkClassName}>
              <img
                aria-label="Oponeko Logo"
                className={clsx('', className)}
                src={LogoWhite.toString()}
              />
            </Link>
          ) : (
            <img
              aria-label="Oponeko Logo"
              className={clsx('', className)}
              src={LogoWhite.toString()}
            />
          ),
          'white-text': to ? (
            <Link to={to} className={linkClassName}>
              <img
                aria-label="Oponeko Logo"
                className={clsx('', className)}
                src={LogoWhiteText.toString()}
              />
            </Link>
          ) : (
            <img
              aria-label="Oponeko Logo"
              className={clsx('', className)}
              src={LogoWhiteText.toString()}
            />
          ),
          'black-text': to ? (
            <Link to={to} className={linkClassName}>
              <img
                aria-label="Oponeko Logo"
                className={clsx('', className)}
                src={LogoBlackText.toString()}
              />
            </Link>
          ) : (
            <img
              aria-label="Oponeko Logo"
              className={clsx('', className)}
              src={LogoBlackText.toString()}
            />
          ),
        }[variant]
      }
    </Fragment>
  );
};

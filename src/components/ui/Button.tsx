import { ButtonHTMLAttributes } from 'react';
export default function Button({ primary, className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return <button className={`btn${primary ? ' p' : ''} ${className}`} {...rest} />;
}

import * as React from 'react'

type SvgProps = {
  url: string
  spriteId: string
} & React.SVGProps<SVGSVGElement>

const SvgImpl = React.forwardRef<SVGSVGElement, SvgProps>(
  ({ spriteId, url, ...rest }, ref) => {
    return (
      <svg ref={ref} {...rest}>
        <use href={`${url}#${spriteId}`} />
      </svg>
    )
  },
)
export const Svg = React.memo(SvgImpl)

export const generateSvg = (url: string, spriteId: string) => {
  const SvgWrapper = React.forwardRef<
    SVGSVGElement,
    Omit<SvgProps, 'spriteId' | 'url'>
  >((props, ref) => {
    return <Svg {...props} ref={ref} url={url} spriteId={spriteId} />
  })

  return React.memo(SvgWrapper)
}

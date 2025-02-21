import { string } from "zod"

interface Props{
    svgFillColor:string;
    pathFillColor:string;
}
const FilesIcon = ({svgFillColor,pathFillColor}:Props) => {
  return (
    <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.52 0H7.48L6.04 1.52V6H1.48L0.04 7.52V22.56L1.48 24H13.56L15 22.56V18H19.72L21 16.56V4.48L16.52 0ZM16.52 2.08L18.92 4.48H16.52V2.08ZM13.48 22.48H1.48V7.52H6.04V16.56L7.48 18H13.48V22.48ZM19.48 16.48H7.48V1.52H15V6H19.48V16.48Z" fill="white"/>
</svg>

  )
}

export default FilesIcon
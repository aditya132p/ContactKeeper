import Image from 'next/image'
import Home from "../components/home/index"
import { Theme } from "@radix-ui/themes";

export default function Page() {
  return (<>
    <Theme accentColor="violet" grayColor="gray" radius="full">
      <Home />
    </Theme>
  </>)
}

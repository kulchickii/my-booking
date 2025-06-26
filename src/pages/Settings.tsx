import { UpdateSettings } from "../features/settings/UpdateSettings"
import Heading from "../ui/Heading"
import Row from "../ui/Row"

export const Settings = () => {
  return (
  <Row type="vertical">
    <Heading as ='h1'>Update hotel settings</Heading>
    <UpdateSettings/>
  </Row>
  )
}
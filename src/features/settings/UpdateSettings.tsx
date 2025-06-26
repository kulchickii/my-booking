import { useGetSettingsQuery, useUpdateSettingsMutation } from "../../services/apiSettings";

import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Label } from "../../ui/Label";

export const UpdateSettings = () => {
  const {data, isLoading, error } = useGetSettingsQuery(undefined,{
    refetchOnReconnect: true // обновлённый контент, когда связь восстановится
  })
  const [updateSettings, {isLoading: isLoadingUpdateSettings , error:errorUpdateSettings }] = useUpdateSettingsMutation()

  const {maxGuestsPerBooking, maxTerm, minTerm} = data ?? {}

  if (isLoading) return <p>Загрузка</p>
  if (error || errorUpdateSettings) return <p>Error loading settings</p>

  const handleSubmitInput = (value: string, field: string): void => {
    if(value === undefined || (Number(value) === data[field])) return
    updateSettings({[field]: value})
  }

  return (
    <Form>
      <FormRow>
        <Label htmlFor="min-nights">Minimum nights/booking</Label>
        <Input type='number' id='min-nights' defaultValue={minTerm}
          disabled = {isLoadingUpdateSettings}
          onBlur={(e) => handleSubmitInput(e.target.value , 'minTerm')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="max-nights">Maximum nights/booking</Label>
        <Input type='number' id='max-nights' defaultValue={maxTerm}
          disabled = {isLoadingUpdateSettings}
          onBlur={(e) => handleSubmitInput(e.target.value , 'maxTerm')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="max-guests">Maximum guests/booking</Label>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking}
          disabled = {isLoadingUpdateSettings}
          onBlur={(e) => handleSubmitInput(e.target.value , 'maxGuestsPerBooking')}
        />
      </FormRow>

    </Form>
  )
}
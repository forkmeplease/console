import { Button, Callout, Icon } from '@qovery/shared/ui'

export interface DisconnectionConfirmModalProps {
  onSubmit: (force: boolean) => void
  onClose: () => void
}

export function DisconnectionConfirmModal(props: DisconnectionConfirmModalProps) {
  return (
    <div className="p-6">
      <h2 className="h4 text-neutral-400 max-w-sm truncate mb-6">Disconnect the Qovery Github App</h2>
      <Callout.Root className="mb-5" color="yellow">
        <Callout.Icon>
          <Icon iconName="circle-info" />
        </Callout.Icon>
        <Callout.Text>
          <Callout.TextHeading>This action might affect your future deployment</Callout.TextHeading>
          <Callout.TextDescription className="text-xs">
            Removing the Qovery Github App will reset the permission access to your repositories. After the removal,
            Qovery will use your Github account to access them. Make sure that your Github account has the access
            permissions to all the repositories shown in the “Authorised Repositories” section.
          </Callout.TextDescription>
        </Callout.Text>
      </Callout.Root>
      <div className="flex gap-3 justify-end mt-6">
        <Button
          data-testid="cancel-button"
          type="button"
          color="neutral"
          variant="plain"
          size="lg"
          onClick={() => props.onClose()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          data-testid="submit-button"
          color="red"
          onClick={() => {
            props.onSubmit && props.onSubmit(true)
            props.onClose()
          }}
        >
          Disconnect
        </Button>
      </div>
    </div>
  )
}

export default DisconnectionConfirmModal

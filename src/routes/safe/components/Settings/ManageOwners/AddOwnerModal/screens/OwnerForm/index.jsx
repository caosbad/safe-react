// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Paragraph from '~/components/layout/Paragraph'
import Row from '~/components/layout/Row'
import GnoForm from '~/components/forms/GnoForm'
import Col from '~/components/layout/Col'
import Button from '~/components/layout/Button'
import Block from '~/components/layout/Block'
import Hairline from '~/components/layout/Hairline'
import Field from '~/components/forms/Field'
import TextField from '~/components/forms/TextField'
import {
  composeValidators,
  required,
  mustBeEthereumAddress,
  minMaxLength,
  noErrorsOn,
} from '~/components/forms/validator'
import { styles } from './style'

type Props = {
  onClose: () => void,
  classes: Object,
  onSubmit: Function,
}

const OwnerForm = ({
  classes,
  onClose,
  onSubmit,
}: Props) => {
  const handleSubmit = (values) => {
    onSubmit(values)
  }

  return (
    <React.Fragment>
      <Row align="center" grow className={classes.heading}>
        <Paragraph weight="bolder" className={classes.manage} noMargin>
          Add new owner
        </Paragraph>
        <Paragraph className={classes.annotation}>1 of 3</Paragraph>
        <IconButton onClick={onClose} disableRipple>
          <Close className={classes.closeIcon} />
        </IconButton>
      </Row>
      <Hairline />
      <GnoForm onSubmit={handleSubmit}>
        {(...args) => {
          const formState = args[2]

          return (
            <React.Fragment>
              <Block className={classes.formContainer}>
                <Row margin="md">
                  <Paragraph>
                    Add a new owner to the active Safe
                  </Paragraph>
                </Row>
                <Row margin="md">
                  <Col xs={8}>
                    <Field
                      name="ownerName"
                      component={TextField}
                      type="text"
                      validate={composeValidators(required, minMaxLength(1,50))}
                      placeholder="Owner name*"
                      text="Owner name*"
                      className={classes.addressInput}
                    />
                  </Col>
                </Row>
                <Row margin="md">
                  <Col xs={8}>
                    <Field
                      name="ownerAddress"
                      component={TextField}
                      type="text"
                      validate={composeValidators(required, mustBeEthereumAddress)}
                      placeholder="Owner address*"
                      text="Owner address*"
                      className={classes.addressInput}
                    />
                  </Col>
                </Row>
              </Block>
              <Hairline />
              <Row align="center" className={classes.buttonRow}>
                <Button className={classes.button} minWidth={140} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={classes.button}
                  variant="contained"
                  minWidth={140}
                  color="primary"
                  data-testid="review-tx-btn"
                >
                  Next
                </Button>
              </Row>
            </React.Fragment>
          )
        }}
      </GnoForm>
    </React.Fragment>
  )
}

export default withStyles(styles)(OwnerForm)

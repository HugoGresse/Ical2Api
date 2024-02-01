import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { CircularProgress } from '@material-ui/core'
import { SimpleDialog } from '../../../sharedComponents/SimpleDialog'
import { deleteOrganization } from '../../actions/actions'
import { useHistory } from 'react-router-dom'

const DeleteOrg = ({ org, isSubmitting, dispatch }) => {
    const history = useHistory()

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleteInProgress, setDeleteInProgress] = useState(false)

    const onDeleteWanted = () => {
        setDeleteDialogOpen(true)
    }

    const onDeleteOrg = async () => {
        setDeleteInProgress(true)
        try {
            const success = await deleteOrganization(org.id, dispatch)
            if (success) {
                history.push('/')
            }
        } catch (error) {
            setDeleteInProgress(false)
        }
    }

    return (
        <>
            <Button
                disabled={isSubmitting}
                onClick={onDeleteWanted}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}>
                Delete organization
            </Button>
            <SimpleDialog
                title="Delete confirm"
                onCancel={() => setDeleteDialogOpen(false)}
                open={deleteDialogOpen}>
                <Typography>
                    Are you sure you want to delete the organization {org.name}?
                    This will also delete all events, reminders & icals.
                </Typography>

                <Box
                    display="flex"
                    marginTop={1}
                    justifyContent="space-between">
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        disabled={deleteInProgress}
                        variant="contained">
                        Cancel
                    </Button>

                    <Button
                        onClick={onDeleteOrg}
                        variant="contained"
                        color="secondary"
                        disabled={deleteInProgress}
                        startIcon={!deleteInProgress && <DeleteIcon />}>
                        {deleteInProgress && (
                            <CircularProgress
                                style={{ width: 20, height: 20 }}
                            />
                        )}{' '}
                        I agree, delete org, events, icals, reminders.
                    </Button>
                </Box>
            </SimpleDialog>
        </>
    )
}

export default DeleteOrg

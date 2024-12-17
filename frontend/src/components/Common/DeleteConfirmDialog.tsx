import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteOutline } from '@mui/icons-material';
import { deleteConversation } from '@/services/requests/conversationApi';
import { Conversation } from '@/types/conversationTypes';
import { styled } from '@mui/material';
import { StyledButton } from './StyledButton';


const StyledDialog = styled(Dialog)(({ }) => ({
    "& .MuiDialog-paper": {
        backgroundColor: "var(--surface)",
        width: "400px",
        height: "auto",
        minHeight: "168px",
        padding: "14px 0px 0px 0px",
        borderRadius: "24px",
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    "& .MuiBackdrop-root": {
        backdropFilter: "blur(30px)",
    },
}));

interface DeleteConfirmDialogProps {
    conversationId: number;
    conversationTitle: string;
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
}

export default function DeleteConfirmDialog({ conversationTitle, conversationId, setConversations }: DeleteConfirmDialogProps) {
    const [open, setOpen] = React.useState(false);

    const handleDelete = async (conversationId: number) => {
        await deleteConversation(conversationId);
        setConversations((prev) => prev.filter((conversation) => conversation.id !== conversationId));
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DeleteOutline onClick={handleClickOpen} />
            <StyledDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <span className='titleLarge text-onSurface'>Are you sure you want to delete {conversationTitle}?</span>
                </DialogTitle>
                <DialogActions className='mb-4'>
                    <div className='flex justify-center items-center gap-4 w-[336px] m-auto'
                    >
                        <StyledButton
                            onClick={handleClose}
                            bgColor="var(--secondary-container)"
                            textColor="var(--on-secondary-container)"
                            hoverBgColor="#D8CDE8"
                        >
                            <span className='labelLarge'>Cancel</span>
                        </StyledButton>

                        <StyledButton
                            onClick={() => handleDelete(conversationId)}
                            bgColor="var(--error)"
                            textColor="var(--on-primary)"
                            hoverBgColor="#9F1B17"
                        >
                            <span className='labelLarge'>Delete</span>
                        </StyledButton>
                    </div>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}

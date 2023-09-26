import supabase from '../supabase';
import { Database } from '../supabase.types';
import React, { FormEvent } from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form, FormGroup } from 'reactstrap';

interface CreateProjectModalProps {
    isOpen: boolean,
    setIsOpen: (b: boolean) => void
}

interface FormState {
    file: ArrayBuffer,
    projname: string,
    desc: string
}

type Project = Database['public']['Tables']['projects']['Row'];

/**
 * 
 * @param props pair of [isCreateModalOpen, setIsCreateModalOpen] for getting/setting modal state
 * @returns 
 */
function CreateProjectModal(props: CreateProjectModalProps) {
    // const [blendFile, setBlendFile] = useState<ArrayBuffer | undefined>(undefined);
    // const [fileName, setFileName] = useState<string | undefined>(undefined);

    /**
     * Submits project entry and file to server. Triggered on form submit.
     * @param e HTML <form> element data
     */
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let form = e.currentTarget as HTMLFormElement;

        let fr = new FileReader();
        fr.onload = async (e2: ProgressEvent<EventTarget>) => {
            try {
                let target = e2.target as FileReader;
                let fileData = target.result as ArrayBuffer;
                if (fileData === undefined) {
                    console.log("Bad file input");
                    return;
                }
                let formState: FormState = {
                    file: fileData,
                    projname: form['projname'].value,
                    desc: form['desc'].value
                }
                console.log(formState);
                const x = form['projname'];

                // insert to supabase
                const getUserResult = await supabase.auth.getUser();
                if (!getUserResult.data) {
                    console.log(getUserResult.error!.message);
                    return;
                }
                if (!getUserResult.data!.user) {
                    console.log("Not logged in?");
                    return;
                }
                const userId = getUserResult.data!.user!.id;
                //console.log("ID: " + userId);
                
                const insertResult = await supabase.from('projects').insert({
                    author: userId,
                    blender_version: '3.6',
                    description: form['desc'].value,
                    name: form['projname'].value
                }).select('id');
                if (insertResult.data !== null) {
                    const projectId = insertResult.data[0].id;
                    console.log(projectId);
                    const uploadResult = await supabase
                        .storage
                        .from('blendfiles')
                        .upload(userId + '/' + projectId + '.blend', fileData, { upsert: true });
                    if (uploadResult.data !== null) {
                        props.setIsOpen(false);
                        alert("Successfully uploaded file.");
                    } else {
                        console.log(uploadResult.error);
                    }
                } else {
                    console.log(insertResult.error!);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fr.readAsArrayBuffer(form['file'].files[0]);
    }

    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader>Create Project</ModalHeader>
            <Form onSubmit={handleSubmit} method='post'>
                <ModalBody>
                        <FormGroup>
                            <Label>Select a file</Label>
                            <Input type='file' name='file' accept='.blend' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Name your project</Label>
                            <Input type='text' name='projname' placeholder='Name' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='desc'>Describe your project</Label>
                            <Input type='textarea' name='desc' placeholder='Description...' />
                        </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => props.setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" color="primary">Submit</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default CreateProjectModal;
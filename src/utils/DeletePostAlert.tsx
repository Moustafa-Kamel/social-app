"use client";

import { Modal, Button } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};
export function DeletePostAlert({ isOpen, onOpenChange, onConfirm }: Props) {
  return (
 <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-100">
            <Modal.CloseTrigger />
            <Modal.Header>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/10">
                  <TrashBin className="size-5 text-danger" />
                </div>
                <Modal.Heading>Delete post?</Modal.Heading>
              </div>
            </Modal.Header>
            <Modal.Body>
              <p>This post will be permanently removed from your profile and feed.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="tertiary" onPress={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onPress={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
              >
                Delete post
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
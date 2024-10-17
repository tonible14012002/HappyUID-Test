import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { RiCheckLine } from 'react-icons/ri'

import { useToast } from '@/hooks/useToast'
import { useRemoveProductMutation } from '@/stores/product'
import type { Product } from '@/types/schema'

interface DeleteProductModalProps {
  toDeleteProducts: Product[]
  isOpen: boolean
  onClose: () => void
  onDeleteDone?: () => void
}

export const DeleteProductModal = (props: DeleteProductModalProps) => {
  const { toDeleteProducts, isOpen, onClose, onDeleteDone } = props
  const [removeProduct, { isLoading, isSuccess }] = useRemoveProductMutation()
  const { toast } = useToast()

  const handleRemove = async () => {
    try {
      await removeProduct(toDeleteProducts.map((product) => product.id))
      onDeleteDone?.()
      setTimeout(() => {
        onClose()
      }, 200)
    } catch (error) {
      console.error(error)
      toast({
        variant: 'danger',
        title: "Couldn't delete product",
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose} closeButton>
      <ModalContent>
        <ModalHeader>
          Delete product{toDeleteProducts.length > 1 ? 's' : ''}
        </ModalHeader>
        <ModalBody>
          {toDeleteProducts.length === 1 ? (
            <>
              Are you sure you want to delete the product{' '}
              <b>{toDeleteProducts[0].name}</b>? This action cannot be undone.
            </>
          ) : (
            <>
              Are you sure you want to delete {toDeleteProducts.length}{' '}
              products? This action cannot be undone.
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button
            color="default"
            isDisabled={isLoading}
            onClick={handleRemove}
            startContent={isSuccess ? <RiCheckLine /> : null}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

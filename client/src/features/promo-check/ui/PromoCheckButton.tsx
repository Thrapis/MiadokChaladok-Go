import { Button, Icon } from "shared/ui"

type Props = {
    className?: string
    onSuccess?: () => void
    onFailure?: () => void
    promocode: string
}

export const PromoCheckButton = ({
    className,
    onSuccess,
    onFailure,
    promocode
}: Props) => {

    const checkPromocode = () => {
        onSuccess?.()
        // onFailure?.()
    }

    return(
        <Button 
            className={className}
            size='medium' 
            width='height'    
        >
            <Icon type='check' size='m' />
        </Button>
    )
}
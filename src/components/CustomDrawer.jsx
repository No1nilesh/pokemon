// CustomDrawer.jsx
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import PropTypes from "prop-types"
import { Button } from "./ui/button"

export function CustomDrawer({ children, open, onOpenChange, title, description }) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        {title && <DrawerTitle>{title}</DrawerTitle>}
                        {description && <DrawerDescription>{description}</DrawerDescription>}
                    </DrawerHeader>

                    <div className="py-2">{children}</div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button>Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

CustomDrawer.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
}

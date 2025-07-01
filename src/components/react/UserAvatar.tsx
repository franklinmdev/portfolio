import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserAvatar() {
  return (
    <Avatar className="h-10 w-10 ring-2 ring-violet-400/20 transition-all duration-300 hover:ring-violet-400/40">
      <AvatarImage src="/avatar.png" alt="Franklin Martinez" />
      <AvatarFallback className="bg-gradient-to-br from-violet-400 to-violet-600 text-sm font-bold text-white">
        FM
      </AvatarFallback>
    </Avatar>
  )
}

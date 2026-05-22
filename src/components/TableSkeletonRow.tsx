import { Skeleton } from './ui/skeleton'

export default function TableSkeletonRow() {
  return (
    <tr className="align-top">
      <td className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
      <td className="px-4 py-4"><Skeleton className="h-9 w-20" /></td>
    </tr>
  )
}

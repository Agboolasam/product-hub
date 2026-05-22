import { Skeleton } from './ui/skeleton'

export default function TableSkeletonRow() {
  return (
    <tr className="align-top">
      <td className="px-4 py-4"><Skeleton className="w-28" /></td>
      <td className="px-4 py-4"><Skeleton /></td>
      <td className="px-4 py-4"><Skeleton className="w-16" /></td>
      <td className="px-4 py-4"><Skeleton className="w-12" /></td>
      <td className="px-4 py-4"><Skeleton className="w-12" /></td>
      <td className="px-4 py-4"><Skeleton className="w-24" /></td>
      <td className="px-4 py-4"><Skeleton className="h-9 w-16" /></td>
    </tr>
  )
}

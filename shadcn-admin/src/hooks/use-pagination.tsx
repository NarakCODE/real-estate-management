import { useMemo } from 'react'

type UsePaginationProps = {
  currentPage: number
  totalPages: number
  /**
   * The number of pages to display on each side of the current page.
   * @default 1
   */
  siblingCount?: number
}

const DOTS = '...'

/**
 * A helper function to create a range of numbers.
 * @param start The starting number of the range.
 * @param end The ending number of the range.
 * @returns An array of numbers within the specified range.
 */
const range = (start: number, end: number): number[] => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

/**
 * A custom hook to calculate pagination details.
 */
export const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    // Total numbers to show = siblings on each side + first page + last page + current page + 2 * DOTS
    const totalPageNumbers = siblingCount + 5

    /*
      Case 1: If the number of pages is less than the page numbers we want to show,
      we return the range [1..totalPages] without any ellipsis.
    */
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    /*
      We do not show DOTS if there is only one page number to be inserted between
      the extremes of sibling and the page limits.
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    /*
      Case 2: No left DOTS to show, but right DOTS are needed.
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Show first 3 + siblingCount + 1 pages
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, DOTS, lastPageIndex]
    }

    /*
      Case 3: No right DOTS to show, but left DOTS are needed.
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
      Case 4: Both left and right DOTS are needed.
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    // Default case (should not be reached if logic is sound)
    return []
  }, [totalPages, siblingCount, currentPage])

  // --- Derive the final output based on the user component's needs ---

  const showLeftEllipsis =
    paginationRange.includes(DOTS) && paginationRange.indexOf(DOTS) === 1
  const showRightEllipsis =
    paginationRange.includes(DOTS) &&
    paginationRange.lastIndexOf(DOTS) === paginationRange.length - 2

  const pages = paginationRange.filter(
    (pageNumber): pageNumber is number => typeof pageNumber === 'number'
  )

  return {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
  }
}

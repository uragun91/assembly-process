export enum AssemblyStatuses {
  inReview = 'IN_REVIEW',
  reviewFinished = 'REVIEW_FINISHED'
}

export const assemblyStatusesMap: {[key in AssemblyStatuses]: string} = {
  IN_REVIEW: 'In Review',
  REVIEW_FINISHED: 'Review Finished'
}

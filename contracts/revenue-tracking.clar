;; Revenue Tracking Contract
;; This contract monitors income from various distribution channels

(define-data-var contract-owner principal tx-sender)

;; Revenue channel types
(define-constant CHANNEL-THEATRICAL u1)
(define-constant CHANNEL-STREAMING u2)
(define-constant CHANNEL-VOD u3)
(define-constant CHANNEL-DVD u4)
(define-constant CHANNEL-TV u5)
(define-constant CHANNEL-OTHER u6)

;; Revenue entry data structure
(define-map revenue-entries
  { entry-id: uint }
  {
    film-id: uint,
    territory-id: uint,
    channel-type: uint,
    amount: uint,
    timestamp: uint,
    description: (string-utf8 100)
  }
)

;; Film total revenue tracking
(define-map film-revenue
  { film-id: uint }
  { total-revenue: uint }
)

;; Keep track of the total number of revenue entries
(define-data-var entry-count uint u0)

;; Check if caller is contract owner
(define-private (is-contract-owner)
  (is-eq tx-sender (var-get contract-owner))
)

;; Record a new revenue entry
(define-public (record-revenue
    (film-id uint)
    (territory-id uint)
    (channel-type uint)
    (amount uint)
    (description (string-utf8 100)))
  (let (
    (entry-id (+ (var-get entry-count) u1))
    (current-total (default-to u0 (get total-revenue (map-get? film-revenue { film-id: film-id }))))
    (new-total (+ current-total amount))
  )
    (asserts! (is-contract-owner) (err u403))
    (asserts! (or
      (is-eq channel-type CHANNEL-THEATRICAL)
      (is-eq channel-type CHANNEL-STREAMING)
      (is-eq channel-type CHANNEL-VOD)
      (is-eq channel-type CHANNEL-DVD)
      (is-eq channel-type CHANNEL-TV)
      (is-eq channel-type CHANNEL-OTHER)
    ) (err u400))

    ;; Record the revenue entry
    (map-insert revenue-entries
      { entry-id: entry-id }
      {
        film-id: film-id,
        territory-id: territory-id,
        channel-type: channel-type,
        amount: amount,
        timestamp: block-height,
        description: description
      }
    )

    ;; Update the film's total revenue
    (map-set film-revenue
      { film-id: film-id }
      { total-revenue: new-total }
    )

    (var-set entry-count entry-id)
    (ok entry-id)
  )
)

;; Get revenue entry details
(define-read-only (get-revenue-entry (entry-id uint))
  (map-get? revenue-entries { entry-id: entry-id })
)

;; Get total revenue for a film
(define-read-only (get-film-total-revenue (film-id uint))
  (default-to u0 (get total-revenue (map-get? film-revenue { film-id: film-id })))
)

;; Transfer ownership
(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-contract-owner) (err u403))
    (var-set contract-owner new-owner)
    (ok true)
  )
)

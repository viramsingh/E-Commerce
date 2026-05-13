export const TAX_RATE = 0.18

export const coupons = [
  {
    code: 'SAVE10',
    label: '10% off orders above $100',
    discountType: 'percent',
    value: 10,
    minimumCartValue: 100,
    expiresAt: '2027-12-31',
  },
  {
    code: 'ELECTRO50',
    label: '$50 off electronics above $400',
    discountType: 'fixed',
    value: 50,
    minimumCartValue: 400,
    categories: ['smartphones', 'laptops'],
    expiresAt: '2027-06-30',
  },
  {
    code: 'BEAUTY15',
    label: '15% off beauty products',
    discountType: 'percent',
    value: 15,
    minimumCartValue: 30,
    categories: ['beauty', 'fragrances', 'skin-care'],
    expiresAt: '2027-09-30',
  },
]

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number.isFinite(value) ? value : 0)
}

export function calculateDiscount(subtotal, coupon, items = []) {
  if (!coupon) return 0

  const eligibleItems = coupon.categories?.length
    ? items.filter((item) => coupon.categories.includes(item.category))
    : items
  const eligibleSubtotal = eligibleItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  if (coupon.discountType === 'fixed') {
    return Math.min(coupon.value, eligibleSubtotal, subtotal)
  }

  return Math.min((eligibleSubtotal * coupon.value) / 100, subtotal)
}

export function validateCoupon(code, subtotal, items) {
  const normalizedCode = code.trim().toUpperCase()

  if (!/^[A-Z0-9]{4,12}$/.test(normalizedCode)) {
    return { valid: false, message: 'Use 4-12 letters or numbers only.' }
  }

  const coupon = coupons.find((entry) => entry.code === normalizedCode)
  if (!coupon) return { valid: false, message: 'Coupon code was not found.' }

  if (new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, message: 'This coupon has expired.' }
  }

  if (subtotal < coupon.minimumCartValue) {
    return {
      valid: false,
      message: `Cart must be at least ${formatCurrency(coupon.minimumCartValue)}.`,
    }
  }

  if (coupon.categories?.length) {
    const hasEligibleItem = items.some((item) => coupon.categories.includes(item.category))
    if (!hasEligibleItem) {
      return { valid: false, message: 'No eligible products for this coupon.' }
    }
  }

  return { valid: true, coupon, message: `${coupon.code} applied.` }
}

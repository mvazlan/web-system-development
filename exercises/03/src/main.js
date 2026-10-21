const form = document.querySelector('#expense-form')
const nameInput = document.querySelector('[name="expense-name"]')
const amountInput = document.querySelector('[name="expense-amount"]')
const errorMessage = document.querySelector('#form-error')
const expenseList = document.querySelector('#expense-list')
const totalElement = document.querySelector('#total')
const countElement = document.querySelector('#expense-count')
const emptyState = document.querySelector('#empty-state')

const expenses = []

const formatCurrency = amount => `€${amount.toFixed(2)}`

const calculateTotal = () =>
  expenses.reduce((total, expense) => total + expense.amount, 0)

const renderExpenses = () => {
  expenseList.innerHTML = ''

  expenses.forEach((expense, index) => {
    const item = document.createElement('li')
    item.classList.add('expense-item')

    const name = document.createElement('span')
    name.classList.add('expense-name')
    name.textContent = expense.name

    const amount = document.createElement('strong')
    amount.classList.add('expense-value')
    amount.textContent = formatCurrency(expense.amount)

    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.type = 'button'
    removeButton.textContent = 'Remove'
    removeButton.setAttribute('aria-label', `Remove ${expense.name}`)
    removeButton.addEventListener('click', () => removeExpense(index))

    item.append(name, amount, removeButton)
    expenseList.appendChild(item)
  })

  totalElement.textContent = formatCurrency(calculateTotal())
  countElement.textContent = `${expenses.length} ${expenses.length === 1 ? 'item' : 'items'}`
  emptyState.hidden = expenses.length > 0
}

const removeExpense = index => {
  expenses.splice(index, 1)
  renderExpenses()
}

const validateExpense = (name, amount) => {
  if (name === '') {
    return 'Please enter an expense name.'
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return 'Please enter a valid positive amount.'
  }

  return ''
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const expenseName = nameInput.value.trim()
  const expenseAmount = Number(amountInput.value)
  const validationError = validateExpense(expenseName, expenseAmount)

  if (validationError) {
    errorMessage.textContent = validationError
    return
  }

  expenses.push({
    name: expenseName,
    amount: expenseAmount,
  })

  errorMessage.textContent = ''
  form.reset()
  renderExpenses()
  nameInput.focus()
})

renderExpenses()

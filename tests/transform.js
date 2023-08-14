// 1 2 3 4 5
// 1 4 2 5 3

// 1 4
// 2 5
// 3

// 1 2

// 1 2 3

// 1 3 4
// 2

// 1 3 5
// 2 4

// 1 3 5
// 2 4 6

// 1 4 7
// 2 5
// 3 6

function matrixSortList(list, cols = 2) {
  // let rows = (list.length + 1) >> 1
  let rows = Math.ceil(list.length / cols)
  const matrix = new Array(rows)
  // fill array
  for (let i = 0; i < rows; ++i) {
    matrix[i] = new Array(cols).fill(-1)
  }
  console.log('matrix:', matrix)
  // let preRow = 0
  const findPos = () => {
    for (let c = 0; c < cols; c++) {
      // 按列排
      for (let r = 0; r < rows; r++) {
        if (matrix[r][c] === -1) {
          // ok 可以填入
          // matrix[r][c] = item
          return [r, c]
        }
      }
    }
  }
  for (let i = 0, len = list.length; i < len; ++i) {
    let item = list[i]
    // 查找出填入矩阵的第几行第几列上
    const [r, c] = findPos()
    matrix[r][c] = item
  }
  console.log('matrix ret:', matrix)
  const result = matrix.flatMap((item) => {
    console.log('item:', item)
    if (item[item.length - 1] === -1) {
      item.pop()
    }
    return item
  })

  return result
}
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// const ret = matrixSortList(list, 4)
// console.log(ret)

function transformListByTwoCol(list) {
  // 1 2 3 4 5
  // 1 4 2 5 3

  // 1 4
  // 2 5
  // 3
  let size = list.length
  const result = new Array(size)
  let mid = (size - 1) >> 1
  for (let i = 0; i < size; ++i) {
    let item = list[i]
    if (i <= mid) {
      result[2 * i] = item
    } else {
      result[2 * (i - mid - 1) + 1] = item
    }
  }
  return result
}

const list2 = []
for (let i = 0; i < 5; i++) {
  list2.push(i + 1)
}
console.log(list2)
console.log(transformListByTwoCol(list2))

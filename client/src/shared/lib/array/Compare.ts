/** Are arrays absolutely equal*/ 
export function ArraysHardEqual(a: any[], b: any[]) {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
    }
    return true
}


/** Are arrays equal like sets */ 
export function ArraysSoftEqual(a: any[], b: any[]) {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    const aSort = a.sort()
    const bSort = b.sort()

    for (var i = 0; i < aSort.length; ++i) {
        if (aSort[i] !== bSort[i]) return false
    }
    return true
}
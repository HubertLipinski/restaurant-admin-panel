export interface Menu {
    int: number,
    name: string,
    active: boolean,
    created_at: string | null,
    updated_at: string | null,
}

export type MenuFilterType = 'active' | 'inactive' | 'all' | null

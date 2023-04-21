import { produce } from 'immer'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { uniqueID } from './utils/helpers'

type BearsState = {
	passes: string[]
	addPass: (payload: any) => void
	updatePass: (payload: any) => void
}

export const usePassesStore = create<BearsState>()(
	persist(
		(set) => ({
			passes: [],
			addPass: (payload) =>
				set(
					produce((draft) => {
						draft.passes.push({ ...payload, id: uniqueID() })
					})
				),
			updatePass: (payload) =>
				set(
					produce((draft) => {
						const index = draft.passes.findIndex(
							(pass: any) => pass.id === payload.id
						)
						draft.passes[index] = payload
					})
				),
		}),
		{
			name: 'boarding-pass-list',
			storage: createJSONStorage(() => localStorage),
		}
	)
)

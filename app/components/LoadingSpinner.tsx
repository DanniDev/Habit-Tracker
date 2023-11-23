import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
export const LoadingSpinner = (props: { loading: boolean }) => {
	return (
		<div className='absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
			<ClipLoader color={'#52cca5'} loading={props.loading} size={80} />
		</div>
	);
};

pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Buyer
 * @dev Store & retreive value in a variable
 */
contract Buyer {

    uint256 balance;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function storeBalance(uint256 num) public {
        balance = num;
    }

    /**
     * @dev Return value 
     * @return value of 'balance'
     */
    function retreiveBalance() public view returns (uint256){
        return balance;
    }
}
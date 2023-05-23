import styled from 'styled-components';

const StyledPromotion = styled.div`
    width: 100%;
    margin-top: 30px;
    padding: 0px 20px;
    .shipping-message{
        text-align: center;
        margin-top: 5px;
    }
    .shipping-bar{
        width: 100%;
        height: 0.4rem;
        position: relative;
        background: #e5e5e5;
        border-radius: 8px;
    }
    .shipping-progress{
        top: 0;
        left: 0;
        height: 100%;
        position: absolute;
        background: #24AAE1;
        transition: width 500ms ease-in-out 0s;
        border-radius: 8px;
    }
    .shipping-tooltip{
        bottom: -4px;
        outline: none;
        z-index: 1;
        position: absolute;
        transform: translate(-50%, 0);
        left: 100%;
        cursor: pointer;
        &.active{
            .tooltip-label{
                color: #24AAE1;
            }
            &:after{
            top: calc(100% + 6px);
            left: -40px;
            color: #fff;
            width: 90%;
            content: attr(data-tooltip);
            padding: 10px;
            z-index: 20;
            opacity: 1;
            position: absolute;
            transform: translateX(-50%) translateY(0%);
            font-size: 12px;
            min-width: 170px;
            max-width: 790px;
            background: #24AAE1;
            box-shadow: var(--light-shadow);
            text-align: center;
            border-radius: 5px;
            pointer-events: none;
            letter-spacing: .75px;
        }
        }
        .tooltip-label{
            left: -80px;
            bottom: 100%;
            position: absolute;
            transform: translate(-50%, 0);
            font-size: 0.83333rem;
            white-space: nowrap;
            padding-bottom: 0.26667rem;
        }
        .tooltip-circle{
            width: 0.93333rem;
            height: 0.93333rem;
            padding: 0.13333rem;
            background: #24AAE1;
            transition: transform 300ms ease-in-out;
            border-radius: 100%;
            &:after{
                width: 0.66667rem;
                height: 0.66667rem;
                content: "";
                display: block;
                background: #24AAE1;
                border-radius: 100%;
            }
        }
    }
`;


export default StyledPromotion;
